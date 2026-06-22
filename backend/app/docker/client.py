import docker

client = docker.from_env()


def get_container_count():

    containers = client.containers.list()

    return len(containers)


def get_containers():

    containers = client.containers.list(all=True)

    container_list = []

    for container in containers:

        container_list.append(
            {
                "id": container.short_id,

                "name": container.name,

                "image": container.image.tags[0]
                if container.image.tags
                else "unknown",

                "status": container.status,
            }
        )

    return container_list