import MyProfile from "@/components/MyProfile";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col col-md-3 py-5">
            <MyProfile />
          </div>
          <div className="col col-md-9 py-5">
            <h2>Últimas Postagens</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
