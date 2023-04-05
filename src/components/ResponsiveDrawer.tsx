import * as React from "react";
import { FC, PropsWithChildren, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import RouteIcon from "@mui/icons-material/Route";
import PersonIcon from "@mui/icons-material/Person";
import FaceIcon from "@mui/icons-material/Face";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { useGetUserByMeQuery } from "../hooks/queries/useGetUserByMeQuery";
import { useLogoutMutation } from "../hooks/mutations/useLogoutMutation";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export const ResponsiveDrawer: FC<PropsWithChildren<Props>> = (props) => {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: user, error } = useGetUserByMeQuery();
  const { mutate } = useLogoutMutation();

  const isAuthenticated = !!user && !error;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => mutate({});

  const menus = [
    { text: "Itinerários", href: "/itinerarios", Icon: RouteIcon },
    { text: "Escolas", href: "/escolas", Icon: SchoolIcon },
    { text: "Alunos", href: "/alunos", Icon: FaceIcon },
    {
      text: "Responsáveis",
      href: "/responsaveis",
      Icon: SupervisedUserCircleIcon,
    },
    { text: "Usuários", href: "/usuarios", Icon: PersonIcon },
  ];
  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Toolbar />
      <Divider />
      <List>
        {menus.map(({ text, href, Icon }, index) => (
          <ListItem key={text} disablePadding>
            <Link href={href} passHref legacyBehavior>
              <ListItemButton>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key="Stephano" disablePadding>
          <Link
            href={{
              pathname: "/usuarios/[user]/editar",
              query: { user: user?.id },
            }}
            passHref
            legacyBehavior
          >
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  alt={user?.firstName}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary={user?.firstName} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="Sair" disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {isAuthenticated && (
        <>
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                SchoolGo
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {isAuthenticated && <Toolbar />}
        {children}
      </Box>
    </Box>
  );
};
