package pe.gob.munisantanita.adminweb.admin.noticias.Repository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import pe.gob.munisantanita.adminweb.Base.Utils.Constant;
import pe.gob.munisantanita.adminweb.Base.Utils.F;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;
import pe.gob.munisantanita.adminweb.admin.noticias.model.Imagen;

@Repository
public class NoticiaRepository {
	public ArrayList<?> subir_imagen() {

        try {
   		 HttpResponse httpResponse = F.get(Helper.apiNoticias("noticia/imagen"));
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

	public Imagen enviarImagen(ArrayList<MultipartFile> files, @RequestParam("noticia_id") long noticia_id) {
		
		
		try {

		    for (MultipartFile file : files) {
				String archivo_real = file.getOriginalFilename();
				String archivo_ext = archivo_real.substring(archivo_real.lastIndexOf('.'));
				String archivo_nuevo = UUID.randomUUID().toString()+archivo_ext;
		
				file.transferTo(new File(Constant.DIR_UPLOAD_DATA_NOTICIAS_GALERIA, archivo_nuevo));
			
				
			    Imagen imagen = new Imagen();
			    imagen.setArchivo_url(Constant.PRINCIPAL_URL + "data"+Constant.DIR_UPLOAD_NOTICIAS_GALERIA + archivo_nuevo);
			    imagen.setNoticia_id(noticia_id);

				 ObjectMapper oM = new ObjectMapper();

		   		 HttpResponse httpResponse = F.post(Helper.apiNoticias("galeria"), oM.writeValueAsString(imagen));
		   		 String r = EntityUtils.toString( httpResponse.getEntity());

		   		 return oM.readValue(r, Imagen.class);

		    }

			  
			} catch (IllegalStateException | IOException e) {
				System.out.println("getMessage: "+e.getMessage());
				e.printStackTrace();
			}
			
			 return null;
		
		
		
		
		
		/*
        try {
		 ObjectMapper oM = new ObjectMapper();

   		 HttpResponse httpResponse = F.post(Helper.apiNoticias("galeria"), oM.writeValueAsString(imagen));
   		 String r = EntityUtils.toString( httpResponse.getEntity());

   		 return oM.readValue(r, Imagen.class);

   		
	
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			System.out.println("CategoriaRepository/all: "+e.getMessage());
			e.printStackTrace();
		}
		    

        	return null;*/
	}

	public Object findbyId(long id) {
        try {
   		 HttpResponse httpResponse = F.get(Helper.apiNoticias("noticia/"+id));
   		 ObjectMapper objectMapper = new ObjectMapper();
   		 String r = EntityUtils.toString( httpResponse.getEntity());
          return objectMapper.readValue(r, Object.class);
            
		} catch (ParseException | IOException e) {
			System.out.println("findbyId/all: "+e.getMessage());
			e.printStackTrace();
		}
		 
		 return null;
	}
}
