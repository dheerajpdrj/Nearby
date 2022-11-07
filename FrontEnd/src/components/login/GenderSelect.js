export default function GenderSelect({
    genderError,
    handleRegisterChange
}) {
  return (
    <div className="reg_grid"
    style={{ marginBottom: `${genderError ? "90px" : "0"}` }}>
    <label htmlFor="male">
      Male
      <input type="radio"
        name="gender"
        id="male"
        value="male"
        onChange={handleRegisterChange} />
    </label>
    <label htmlFor="female">
      Female
      <input type="radio"
        name="gender"
        id="female"
        value="female"
        onChange={handleRegisterChange} />
    </label>
    <label htmlFor="custom">
      Custom
      <input type="radio"
        name="gender"
        id="custom"
        value="custom"
        onChange={handleRegisterChange} />
    </label>
    {genderError && <div className="input_error">{genderError}</div>}
  </div>
  )
}
