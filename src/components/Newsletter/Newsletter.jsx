import Button from "../Button/Button";
import "./newsletter.css";

const Newsletter = () => {
  return (
    <div className="app__newsletter">
      <h1>Sign Up to Our Newsletter!</h1>
      <form action="/newsletter-signup" method="post">
        <input type="email" name="email" id="email" placeholder="Email.." />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
};

export default Newsletter;
