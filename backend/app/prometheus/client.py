import requests

PROMETHEUS_URL = (
    "http://host.docker.internal:9090"
)


def query_prometheus(query):

    response = requests.get(

        f"{PROMETHEUS_URL}/api/v1/query",

        params={

            "query": query

        }

    )

    data = response.json()

    result = data["data"]["result"]

    if not result:

        return 0

    return float(

        result[0]["value"][1]

    )


def get_prometheus_metrics():

    node_count = query_prometheus(

        "count(node_uname_info)"

    )

    cpu_usage = query_prometheus(

        '100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)'

    )

    memory_usage = query_prometheus(

        '(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))*100'

    )

    return {

        "nodes": round(node_count),

        "cpu_usage": round(cpu_usage),

        "memory_usage": round(memory_usage),

    }