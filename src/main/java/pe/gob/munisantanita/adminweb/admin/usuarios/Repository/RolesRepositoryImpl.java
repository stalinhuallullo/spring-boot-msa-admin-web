package pe.gob.munisantanita.adminweb.admin.usuarios.Repository;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;

import pe.gob.munisantanita.adminweb.Base.Utils.F;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;

@Repository
public class RolesRepositoryImpl implements RolesRepository{

	@Override
	public ArrayList<?> getAvatares() {

	         try {
	    		 HttpResponse httpResponse = F.get(Helper.apiUsuarios("avatar"));
	    		 ObjectMapper objectMapper = new ObjectMapper();
	    		 String r = EntityUtils.toString( httpResponse.getEntity());
	    		 ArrayList<?> lista = objectMapper.readValue(r, ArrayList.class);
	             return lista;
	             
			} catch (ParseException | IOException e) {
				System.out.println("Err: "+ e.getMessage());
				System.out.println("Ha ocurrido un erros en UsuarioRepositoryImpl.getAvatares()");
				e.printStackTrace();
			}
			 
			 return null;
	}

	@Override
	public Object findRol(long id) {
        try {
   		 HttpResponse httpResponse = F.get(Helper.apiUsuarios("rol/"+id));
   		 ObjectMapper objectMapper = new ObjectMapper();
   		 String r = EntityUtils.toString( httpResponse.getEntity());
   		Object lista = objectMapper.readValue(r, Object.class);

return lista;
            //  return objectMapper.writeValueAsString(lista);

            
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			System.out.println("UsuarioRepositoryImpl/findRol: "+e.getMessage());
			e.printStackTrace();
		}
        
		return null;
	}

}
