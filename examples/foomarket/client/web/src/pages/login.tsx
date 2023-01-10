import { AntdLayout, Button } from "@pankod/refine-antd";
import { useKeycloak } from "@react-keycloak/web";

export const Login: React.FC = () => {
  const { keycloak } = useKeycloak();

  return (
    <AntdLayout
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
        backgroundSize: "cover",
      }}
    >
      <div style={{ height: "100vh", display: "flex" }}>
        <div style={{ maxWidth: "200px", margin: "auto" }}>
          <Button
            type="primary"
            size="large"
            block
            onClick={() => keycloak.login()}
          >
            Sign in
          </Button>
        </div>
      </div>
    </AntdLayout>
  );
};
