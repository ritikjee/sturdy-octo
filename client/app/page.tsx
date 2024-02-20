import axios from "axios";

export default async function Home() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/internships`
  );

  return (
    <main>
      <h1>Internships</h1>
      <ul>
        {
          // @ts-ignore
          data.map((internship) => (
            <li key={internship._id}>
              <h2>{internship.role_name}</h2>
              <p>{internship.company_logo}</p>
            </li>
          ))
        }
      </ul>
    </main>
  );
}
