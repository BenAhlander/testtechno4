// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ name: "John Doe" });
      break;
    case "POST":
      res.status(200).json({ name: "John Doe" });
      break;
    default:
      res.status(405).end(); //Method Not Allowed
  }
}
