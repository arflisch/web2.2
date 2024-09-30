interface FooterProps {
    urlLogo: string;
    children: React.ReactNode;
};

const Footer = (props: FooterProps) => {
    return(
        <footer>
            <div>{props.children}</div>
            <img src={props.urlLogo} alt="logo"/>
        </footer>
    )
};

export default Footer;