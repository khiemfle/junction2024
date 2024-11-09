job "postgres-junction" {
  datacenters = ["dc1"]
  type        = "service"
  node_pool   = "all"

  group "postgres-junction" {
    count = 1

    constraint {
      attribute = "david-GE62VR-6RF"
      operator  = "set_contains"
      value     = "${attr.unique.hostname}"
    }

    network {
      port "db" {
        to = 5432
        static = 25432
        host_network = "wireguard"
      }
    }

    task "postgres-junction" {
      driver = "docker"

      config {
        image = "postgres:16.2-bullseye"
        ports = ["db"]

        mount {
          type   = "bind"
          target = "/data/postgres"
          source = "/home/david/workspace/postgres-junction"
          readonly = false
        }
      }

      env {
        POSTGRES_USER="root"
        POSTGRES_PASSWORD="root"
        PGDATA="/data/postgres"
      }

      service {
        name = "postgres-junction"
        port = "db"

        check {
          name     = "Postgres TCP Check"
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }

      resources {
        cpu    = 500
        memory = 1024
      }
    }
  }
}
