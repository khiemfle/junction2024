job "metrics" {
  datacenters = ["dc1"]
  type        = "service"
  node_pool   = "all"

  constraint {
    attribute = "david-GE62VR-6RF"
    operator  = "set_contains"
    value     = "${attr.unique.hostname}"
  }

  group "grafana" {
    count = 1

    task "grafana" {
      driver = "docker"

      config {
        image = "grafana/grafana:latest"
        ports = ["web"]
        mount {
          type   = "bind"
          target = "/var/lib/grafana"
          source = "/home/david/workspace/grafana"
          readonly = false
        }
      }

      env {
        GF_SECURITY_ADMIN_PASSWORD = "admin"
        GF_SECURITY_ADMIN_USER     = "admin"
        GF_SERVER_ROOT_URL = "https://grafana.khiemfle.com"
      }

      resources {
        cpu    = 500
        memory = 256
      }

      service {
        name = "grafana"
        port = "web"
        provider = "nomad"

        tags = [
          "traefik.enable=true",
          "traefik.http.routers.grafana.rule=Host(`grafana.khiemfle.com`)",
          "traefik.http.routers.grafana.tls=true",
          "traefik.http.routers.grafana.entrypoints=web,websecure",
          "traefik.http.routers.grafana.tls.certresolver=mytlschallenge",
          "traefik.http.middlewares.grafana.headers.SSLRedirect=true",
          "traefik.http.middlewares.grafana.headers.STSSeconds=315360000",
          "traefik.http.middlewares.grafana.headers.browserXSSFilter=true", 
          "traefik.http.middlewares.grafana.headers.contentTypeNosniff=true",
          "traefik.http.middlewares.grafana.headers.forceSTSHeader=true",
          "traefik.http.middlewares.grafana.headers.SSLHost=grafana.khiemfle.com",
          "traefik.http.middlewares.grafana.headers.STSIncludeSubdomains=true",
          "traefik.http.middlewares.grafana.headers.STSPreload=true",
          "traefik.http.routers.grafana.middlewares=grafana@nomad",
        ]
        check {
          type     = "http"
          path     = "/"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }

    network {
      port "web" {
        to = 3000
        host_network = "wireguard"
      }
    }
  }
}