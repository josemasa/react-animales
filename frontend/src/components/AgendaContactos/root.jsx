import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { getContacts, createContact } from "./contacts";
import Navbar from "../Navbar";

export async function action() {
  await createContact();
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div className="contenedor">
        <div>
          <div id="sidebar">
            <h1>Contacts</h1>
            <div>
              <form id="search-form" role="search">
                <input
                  id="q"
                  aria-label="Search contacts"
                  placeholder="Search"
                  type="search"
                  name="q"
                />
                <div id="search-spinner" aria-hidden hidden={true} />
                <div className="sr-only" aria-live="polite"></div>
              </form>
              <Form method="post">
                <button type="submit">NUEVO</button>
              </Form>
            </div>
            <nav>
              {contacts.length ? (
                <ul>
                  {contacts.map((contact) => (
                    <li key={contact.id}>
                      <Link to={`contacts/${contact.id}`}>
                        {contact.first || contact.last ? (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                        {contact.favorite && <span>★</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No contacts</i>
                </p>
              )}
            </nav>
          </div>
          <div id="detail">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
