job "metrics-junction" {
  datacenters = ["dc1"]
  type        = "service"
  node_pool   = "all"

  constraint {
    attribute = "david-GE62VR-6RF"
    operator  = "set_contains"
    value     = "${attr.unique.hostname}"
  }

  group "grafana-junction" {
    count = 1

    task "grafana-junction" {
      driver = "docker"

      config {
        image = "grafana/grafana:latest"
        ports = ["web"]
        mount {
          type   = "bind"
          target = "/var/lib/grafana"
          source = "/home/david/workspace/grafana-junction"
          readonly = false
        }
      }

      env {
        GF_SECURITY_ADMIN_PASSWORD = "admin"
        GF_SECURITY_ADMIN_USER     = "UK}9h}eSX*w5MPD92Q?*inxxeLCfE)FngHJY"
        GF_SERVER_ROOT_URL = "https://grafana.junction.khiemfle.com"
      }

      resources {
        cpu    = 500
        memory = 256
      }

      service {
        name = "grafana-junction"
        port = "web"
        provider = "nomad"

        tags = [
          "traefik.enable=true",
          "traefik.http.routers.grafana-junction.rule=Host(`grafana.junction.khiemfle.com`)",
          "traefik.http.routers.grafana-junction.tls=true",
          "traefik.http.routers.grafana-junction.entrypoints=web,websecure",
          "traefik.http.routers.grafana-junction.tls.certresolver=mytlschallenge",
          "traefik.http.middlewares.grafana-junction.headers.SSLRedirect=true",
          "traefik.http.middlewares.grafana-junction.headers.STSSeconds=315360000",
          "traefik.http.middlewares.grafana-junction.headers.browserXSSFilter=true", 
          "traefik.http.middlewares.grafana-junction.headers.contentTypeNosniff=true",
          "traefik.http.middlewares.grafana-junction.headers.forceSTSHeader=true",
          "traefik.http.middlewares.grafana-junction.headers.SSLHost=grafana.junction.khiemfle.com",
          "traefik.http.middlewares.grafana-junction.headers.STSIncludeSubdomains=true",
          "traefik.http.middlewares.grafana-junction.headers.STSPreload=true",
          "traefik.http.routers.grafana-junction.middlewares=grafana-junction@nomad",
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