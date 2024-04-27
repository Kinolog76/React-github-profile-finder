import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState();

  async function findProfile() {
    if (!userName) return;
    const result = await fetch(`https://api.github.com/users/${userName}`);
    const data = await result.json();
    if (data) {
      console.log(data);
      setUserData(data);
    }
  }

  function handleChange(e) {
    setUserName(e.target.value);
  }

  function containsCyrillic(userName) {
    return /[а-яёА-ЯЁ]/.test(userName);
  }

  return (
    <>
      <h1 className="text-center font-bold text-4xl pt-3">Github Profile Finder</h1>
      <div className="mx-auto flex justify-center gap-3 my-6">
        <input type="text" value={userName} onChange={handleChange} placeholder="Enter user name..." className="px-2 rounded-lg text-lg text-black" />
        <button onClick={findProfile} className="bg-green-700 font-semibold rounded-md px-2 text-lg hover:bg-green-500 disabled:bg-gray-600" disabled={containsCyrillic(userName)}>
          <p className="hidden md:block">Find user</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block md:hidden w-6 h-6 mx-2 my-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
      {!userData || userData.message === "Not Found" ? (
        <h2 className="text-center font-bold text-2xl mt-3">{containsCyrillic(userName) ? "Constain cyrrilic symbol" : "User not found"}</h2>
      ) : (
        <>
          <h2 className="text-center font-bold text-2xl mt-3 mb-3">{containsCyrillic(userName) && "Constain cyrrilic symbol"}</h2>
          <div className="flex w-fit flex-col items-center border border-gray-300 rounded-lg p-3">
            <img src={userData.avatar_url} alt="avatar" className="w-24 h-24 mb-3 rounded-full" />
            <a href={userData.html_url} target="_blank" className="text-2xl font-bold underline hover:text-gray-300">
              {userData.login}
            </a>
            <div className="mb-4 mt-2 flex gap-2">
              <div className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>

                {userData.created_at ? userData.created_at.slice(0, 10).replace(/-/g, ".") : "No date"}
              </div>
              /
              <div className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {userData.location ? userData.location : "No location"}
              </div>
            </div>
            <div className="max-w-[400px] text-center">{userData.bio ? userData.bio : "No bio"}</div>
            <div className="flex sm:justify-between justify-center flex-wrap w-full mt-3 gap-3 border-t border-gray-300 pt-3">
              <div>
                {userData.public_repos ? (
                  <a className="underline" target="_blank" href={`https://github.com/${userData.login}?tab=repositories`}>
                    {userData.public_repos} public repos
                  </a>
                ) : (
                  "No repos"
                )}
              </div>
              <div>{userData.followers ? userData.followers : "No followers"} followers</div>
              <div>{userData.following ? userData.following : "No following"} following</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
