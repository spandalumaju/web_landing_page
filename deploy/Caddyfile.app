# Replace the static smpn2ambulu block in /opt/stack/caddy/Caddyfile
smpn2ambulu.sch.id {
	encode zstd gzip
	reverse_proxy smpn2ambulu:3000

	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		X-Content-Type-Options "nosniff"
		X-Frame-Options "DENY"
		Referrer-Policy "strict-origin-when-cross-origin"
		Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
		-Server
	}

	request_body {
		max_size 12MB
	}
}

www.smpn2ambulu.sch.id {
	redir https://smpn2ambulu.sch.id{uri} permanent
}
