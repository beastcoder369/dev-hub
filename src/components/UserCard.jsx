const Usercard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, age, gender, photoUrl, skills, about } = user;

  return (
    <div className="flex justify-center p-10 m-6">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <img src={photoUrl} alt="photo" />
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">ignored</button>
            <button className="btn btn-ghost">interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
