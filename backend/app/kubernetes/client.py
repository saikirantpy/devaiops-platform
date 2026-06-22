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