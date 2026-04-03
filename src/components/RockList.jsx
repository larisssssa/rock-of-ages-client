import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const RockList = ({ rocks, fetchRocks }) => {
  const location = useLocation();
  useEffect(() => {
    fetchRocks();
  }, [location]);

  const deleteRock = (pk) => {
    fetch(`http://localhost:8000/rocks/${pk}`, {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
      },
      method: "DELETE",
    });
    fetchRocks();
  };

  const displayRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          {rock.name} ({rock.type.label}) weighs {rock.weight} <br />
          In the collection of {rock.user.first_name} {rock.user.last_name}
          {location.pathname === "/mine" ? (
            <div>
              <button
                className="border p-3 bg-red-500 hover:bg-red-700 rounded-full text-white"
                onClick={(e) => {
                  e.preventDefault();
                  deleteRock(rock.id);
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  );
};
