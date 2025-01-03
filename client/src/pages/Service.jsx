import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const URL = "http://localhost:8000/api/v1/services";

function Service() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(URL, {
          method: "GE",
        });
        const data = await res.json();
        console.log(data);

        setServices(data.data);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchServices();
  }, []);

  if (!services.length) return;

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services </h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((curElem, index) => {
          const { price, description, provider, service } = curElem;

          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src="/images/design.png"
                  alt="our services info"
                  width="200"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Service;
