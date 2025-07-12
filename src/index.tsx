import "./index.css";

interface Props {
  title: string;
}

export default function Component({ title }: Props) {
  const [number, setNumber] = React.useState(0);
  return <span onClick={() => setNumber(num => num + 1)}>component goes here with {title} ({number})</span>
}
