import { Container } from "./Container";
import { Logo } from "./Logo";

export const Navbar = () => (
  <Container as="nav" className="border-x border-divide">
    <div className="flex items-center px-4 py-4 md:px-8">
      <Logo />
    </div>
  </Container>
);
