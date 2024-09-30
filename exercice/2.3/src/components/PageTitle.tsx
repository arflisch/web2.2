interface PageaTitleProps {
    title: string;
}


const PageaTitle = (props: PageaTitleProps) => {
    return <h1>{props.title}</h1>
}

export default PageaTitle;