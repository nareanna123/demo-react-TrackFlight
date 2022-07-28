export default function SubMenu(props: any): JSX.Element | null {
  return (
    <div>
      {props.list &&
        props.list.map((item: any) => (
          <div key={item.name}>
            <a style={{ color: "white" }} href="item.name">
              {item.name}
            </a>
          </div>
        ))}
    </div>
  );
}
