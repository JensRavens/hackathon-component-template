import "./index.css";

interface Props {
  title: string;
}

export default function Component({ title }: Props) {
  return <span>component goes here with {title}</span>
}
