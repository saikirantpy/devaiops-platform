from kubernetes import client, config


def get_pod_count():

    config.load_kube_config()

    v1 = client.CoreV1Api()

    pods = v1.list_pod_for_all_namespaces()

    return len(pods.items)