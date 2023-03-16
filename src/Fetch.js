import { useEffect, useState } from "react";

export default ({ id = 1 }) => {
  const [data, setData] = useState({ title: "", body: "", loading: false });
  useEffect(() => {
    const abortController = new AbortController();
    setData((prev) => ({ ...prev, ...{ loading: true } }));
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      signal: abortController.signal
    })
      .then((x) => x.json())
      .then((y) => {
        setData((prev) => ({
          ...prev,
          ...{ title: y.title, body: y.body, loading: false }
        }));
      });
    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <>
      {data.loading ? <span>Loading...</span> : null}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Post</th>
          </tr>
        </thead>
        <tr>
          <td>{data.title}</td>
          <td>{data.body}</td>
        </tr>
      </table>
    </>
  );
};
