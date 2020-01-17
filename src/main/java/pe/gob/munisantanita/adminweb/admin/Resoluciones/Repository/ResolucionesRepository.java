package pe.gob.munisantanita.adminweb.admin.Resoluciones.Repository;

import java.util.ArrayList;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Model.Resoluciones;

public interface ResolucionesRepository {


	public ArrayList<?> tipo();
	public ArrayList<?> area();
	
	public Object buscarResolucion(long id);
}
