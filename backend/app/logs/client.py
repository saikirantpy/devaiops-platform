import docker

def get_logs():

    client = docker.from_env()

    containers = client.containers.list()

    data = []

    for container in containers:

        try:

            logs = container.logs(

                tail=10

            ).decode(

                "utf-8",

                errors="ignore"

            )

            data.append({

                "name": container.name,

                "logs": logs,

            })

        except Exception:

            pass

    return data