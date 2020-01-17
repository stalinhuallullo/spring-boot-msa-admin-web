package pe.gob.munisantanita.adminweb.admin.usuarios.Repository;

import java.util.ArrayList;

public interface RolesRepository {

	ArrayList<?> getAvatares();

	Object findRol(long id);

}
