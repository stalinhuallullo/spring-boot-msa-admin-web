package pe.gob.munisantanita.adminweb.admin.Resoluciones.Repository;

import java.awt.geom.Area;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;

import pe.gob.munisantanita.adminweb.Base.Utils.F;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Model.Resoluciones;
import pe.gob.munisantanita.adminweb.admin.Resoluciones.Model.Tipo;

@Repository
public class ResolucionesRepositoryImpl implements ResolucionesRepository {

	public ArrayList<?> tipo() {
		try {
			HttpResponse httpResponse = F.get(Helper.apiResoluciones("tipo"));
			ObjectMapper objectMapper = new ObjectMapper();
			String r = EntityUtils.toString( httpResponse.getEntity());
			ArrayList<?> lista = objectMapper.readValue(r, ArrayList.class);
		    return lista;
		    
		} catch (ParseException | IOException e) {
			e.printStackTrace();
		}
		 
		return null;
	}
	
	public ArrayList<?> area() {
		try {
			HttpResponse httpResponse = F.get(Helper.apiResoluciones("area"));
			ObjectMapper objectMapper = new ObjectMapper();
			String r = EntityUtils.toString( httpResponse.getEntity());
			ArrayList<?> lista = objectMapper.readValue(r, ArrayList.class);
		    return lista;
		    
		} catch (ParseException | IOException e) {
			e.printStackTrace();
		}
		 
		return null;
	}
	

	@Override
	public Object buscarResolucion(long id) {
		try {
	   		 HttpResponse httpResponse = F.get(Helper.apiResoluciones("resolucion/"+id));
	   		 ObjectMapper objectMapper = new ObjectMapper();
	   		 String r = EntityUtils.toString( httpResponse.getEntity());
	   		Object lista = objectMapper.readValue(r, Object.class);
	            return lista;
	            
			} catch (ParseException | IOException e) {
				e.printStackTrace();
			}
	        
			return null;
	}
	
}
