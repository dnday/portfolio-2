import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  // Social media links and website name
  const socialLinks = [
    {
      name: "Github",
      url: "https://github.com/dnday",
      icon: <BsGithub size={24} className="text-white" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/marcel9994",
      icon: <BsTwitter size={24} className="text-white" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/marcelinus-dinoglide-yoga-prakoso",
      icon: <BsLinkedin size={24} className="text-white" />,
    },
  ];

  const websiteName = "Marcel's";

  return (
    <footer className="text-white">
      <div className="col-md-12">
        {/* Social Links */}
        <div className="social-links flex justify-center mb-4">
          {socialLinks.map((network) => (
            <span key={network.name} className="mx-4">
              <a href={network.url} target="_blank" rel="noopener noreferrer">
                {network.icon}
              </a>
            </span>
          ))}
        </div>

        {/* Copyright Info */}
        <div className="copyright py-4 flex justify-center items-center text-center">
          <div className="container">
            <small>
              Copyright &copy; {new Date().getFullYear()} {websiteName}.
              Inspired by{" "}
              <a
                href="https://seanhalpin.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Se&aacute;n Halpin
              </a>
              .
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
