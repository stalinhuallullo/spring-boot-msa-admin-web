package pe.gob.munisantanita.adminweb.admin.noticias.Repository;

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
public class CategoriaRepository {


	public ArrayList<?> all() {

         try {
    		 HttpResponse httpResponse = F.get(Helper.apiNoticias("categoria"));
    		 ObjectMapper objectMapper = new ObjectMapper();
    		 String r = EntityUtils.toString( httpResponse.getEntity());
    		 ArrayList<?> lista = objectMapper.readValue(r, ArrayList.class);
             return lista;
             
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			System.out.println("CategoriaRepository/all: "+e.getMessage());
			e.printStackTrace();
		}
		 
		 return null;
	}
}
