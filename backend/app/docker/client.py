import docker

client = docker.from_env()


def get_container_count():
    containers = client.containers.list()

    return len(containers)