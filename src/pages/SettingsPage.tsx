const SettingPage = () => {
  return (
    <div>
      <h1>Settings</h1>
      <p>Change your account settings here.</p>

      <form className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          className="p-2 border border-gray-300 rounded-lg"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder=""
          className="p-2 border border-gray-300 rounded-lg"
        />
      </form>
    </div>
  );
};

export default SettingPage;
