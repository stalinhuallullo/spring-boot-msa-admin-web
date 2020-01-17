package pe.gob.munisantanita.adminweb.admin.Resoluciones.Service;

import java.util.ArrayList;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Model.Resoluciones;

public interface ResolucionesService {

	public ArrayList<?> tipo();
	public ArrayList<?> area();
	
	public Object buscarResolucion(long id);
}
