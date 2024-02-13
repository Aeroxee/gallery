This is a trial and error project to create a web gallery.

# How To Run

I use [Next.js](https://nextjs.org) as the front-end and [Golang](https://go.dev) as the back-end API.

- First, clone this repository.
- After that, run `npm install`
- Write `.env` file and customize it yourself.
- Clone my repository [Gallery-API](https://github.com/Aeroxee/gallery-api). After clone, run this code in your terminal.
```bash
go build -o galleryapi cmd/server/main.go

./galleryapi -hostname "[your host or ip addr]" -port 8000
```
- Server API run in http://localhost:8000
- In folder project next.js run `npm run build` and `npm run start`. Server Next.js running on port 3000.
- Open your browser and type `http://localhost:3000`
- Enjoy

---

### Required

[https://github.com/Aeroxee/gallery-api](https://github.com/Aeroxee/gallery)