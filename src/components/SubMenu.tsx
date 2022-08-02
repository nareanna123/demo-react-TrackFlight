export default function SubMenu(props: any): JSX.Element | null {
  return (
    <div>
      {props.list &&
        props.list.map((item: any) => (
          <div style={{ margin: "15px" }} key={item.name}>
            <a style={{ color: "white" }} href={item.path}>
              {item.name}
            </a>
          </div>
        ))}
    </div>
  );
}
