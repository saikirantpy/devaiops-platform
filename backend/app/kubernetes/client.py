from kubernetes import client, config


def load_cluster_config():

    config.load_kube_config(
        config_file="/root/.kube/docker-config"
    )


def get_pod_count():

    load_cluster_config()

    v1 = client.CoreV1Api()

    pods = v1.list_pod_for_all_namespaces()

    return len(pods.items)


def get_pods():

    load_cluster_config()

    v1 = client.CoreV1Api()

    pods = v1.list_pod_for_all_namespaces()

    pod_list = []

    for pod in pods.items:

        pod_list.append(
            {
                "namespace": pod.metadata.namespace,

                "name": pod.metadata.name,

                "status": pod.status.phase,

                "node": pod.spec.node_name,
            }
        )

    return pod_list

def get_namespaces():

    load_cluster_config()

    v1 = client.CoreV1Api()

    namespaces = v1.list_namespace()

    namespace_list = []

    for namespace in namespaces.items:

        namespace_list.append(
            {
                "name": namespace.metadata.name,
                "status": namespace.status.phase,
            }
        )

    return namespace_list

def get_deployments():

    load_cluster_config()

    apps_v1 = client.AppsV1Api()

    deployments = (
        apps_v1.list_deployment_for_all_namespaces()
    )

    deployment_list = []

    for deployment in deployments.items:

        ready = (
            deployment.status.ready_replicas
            or 0
        )

        replicas = (
            deployment.spec.replicas
            or 0
        )

        deployment_list.append(
            {
                "namespace":
                    deployment.metadata.namespace,

                "name":
                    deployment.metadata.name,

                "ready":
                    f"{ready}/{replicas}",

                "replicas":
                    replicas,
            }
        )

    return deployment_list


def get_monitoring():

    load_cluster_config()

    v1 = client.CoreV1Api()

    apps_v1 = client.AppsV1Api()

    pods = v1.list_pod_for_all_namespaces()

    deployments = (
        apps_v1.list_deployment_for_all_namespaces()
    )

    pending_pods = 0

    for pod in pods.items:

        if pod.status.phase == "Pending":

            pending_pods += 1

    unhealthy_deployments = 0

    for deployment in deployments.items:

        ready = (
            deployment.status.ready_replicas
            or 0
        )

        replicas = (
            deployment.spec.replicas
            or 0
        )

        if ready < replicas:

            unhealthy_deployments += 1

    return {

        "cluster_status": "Healthy",

        "pending_pods": pending_pods,

        "unhealthy_deployments":
            unhealthy_deployments,

        "total_deployments":
            len(deployments.items),

    }


def get_diagnostics():

    load_cluster_config()

    apps_v1 = client.AppsV1Api()

    deployments = (
        apps_v1.list_deployment_for_all_namespaces()
    )

    issues = []

    for deployment in deployments.items:

        ready = (
            deployment.status.ready_replicas
            or 0
        )

        replicas = (
            deployment.spec.replicas
            or 0
        )

        if ready < replicas:

            issues.append(
                {
                    "namespace":
                        deployment.metadata.namespace,

                    "name":
                        deployment.metadata.name,

                    "message":
                        f"{ready}/{replicas} replicas ready",

                    "suggestion":
                        "Inspect pod events and deployment status",
                }
            )

    return issues


def get_copilot_answer(question):

    question = question.lower()

    monitoring = get_monitoring()

    diagnostics = get_diagnostics()

    if (

        "unhealthy" in question

        or

        "problem" in question

        or

        "issue" in question

    ):

        answer = []

        answer.append(

            f"Pending Pods: {monitoring['pending_pods']}"

        )

        answer.append(

            f"Unhealthy Deployments: {monitoring['unhealthy_deployments']}"

        )

        for item in diagnostics:

            answer.append(

                f"{item['name']} : {item['message']}"

            )

        answer.append(

            "Suggestion: Inspect pod events and deployment status"

        )

        return "\n".join(answer)

    elif (

        "cluster" in question

        or

        "summary" in question

    ):

        return (

            f"Cluster Status: {monitoring['cluster_status']}\n"

            f"Pending Pods: {monitoring['pending_pods']}\n"

            f"Deployments: {monitoring['total_deployments']}"

        )

    elif (

        "fix" in question

        or

        "priority" in question

    ):

        if diagnostics:

            item = diagnostics[0]

            return (

                f"Fix {item['name']} first.\n"

                f"{item['message']}"

            )

        return "No critical issues found."

    return (

        "Try asking:\n"

        "- Why is my application unhealthy?\n"

        "- What is running in my cluster?\n"

        "- What should I fix first?"

    )