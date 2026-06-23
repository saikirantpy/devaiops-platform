from kubernetes import client, config


def get_pod_count():

    config.load_kube_config()

    v1 = client.CoreV1Api()

    pods = v1.list_pod_for_all_namespaces()

    return len(pods.items)


def get_pods():

    config.load_kube_config()

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


def get_deployments():

    config.load_kube_config()

    apps_v1 = client.AppsV1Api()

    deployments = apps_v1.list_deployment_for_all_namespaces()

    deployment_list = []

    for deployment in deployments.items:

        ready = deployment.status.ready_replicas or 0

        replicas = deployment.spec.replicas or 0

        deployment_list.append(
            {
                "namespace": deployment.metadata.namespace,

                "name": deployment.metadata.name,

                "ready": f"{ready}/{replicas}",

                "replicas": replicas,
            }
        )

    return deployment_list

def get_monitoring():

    config.load_kube_config()

    v1 = client.CoreV1Api()

    apps_v1 = client.AppsV1Api()

    pods = v1.list_pod_for_all_namespaces()

    deployments = apps_v1.list_deployment_for_all_namespaces()

    pending_pods = 0

    for pod in pods.items:

        if pod.status.phase == "Pending":

            pending_pods += 1

    unhealthy_deployments = 0

    for deployment in deployments.items:

        ready = deployment.status.ready_replicas or 0

        replicas = deployment.spec.replicas or 0

        if ready < replicas:

            unhealthy_deployments += 1

    return {

        "cluster_status": "Healthy",

        "pending_pods": pending_pods,

        "unhealthy_deployments": unhealthy_deployments,

        "total_deployments": len(
            deployments.items
        ),

    }
def get_diagnostics():

    config.load_kube_config()

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