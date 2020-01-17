package pe.gob.munisantanita.adminweb.Base.Model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class AutentificacionUsuario extends User {	
	private static final long serialVersionUID = 1L;

    private final long ID;
    private final String email;
    private final String nombres;
    private final long rol_id;
    public AutentificacionUsuario(String username, String password, boolean enabled,
        boolean accountNonExpired, boolean credentialsNonExpired,
        boolean accountNonLocked,
        Collection<GrantedAuthority> authorities,
        long ID, String email, String nombres, long rol_id) {
            super(username, password, enabled, accountNonExpired,credentialsNonExpired, accountNonLocked, authorities);
            this.ID = ID;
            this.email = email;
            this.nombres = nombres;
            this.rol_id = rol_id;
    }

	public long getID() {
		return ID;
	}

	public String getEmail() {
		return email;
	}
	public String getNombres() {
		return nombres;
	}

	public long getRol_id() {
		return rol_id;
	}

 }