package pe.gob.munisantanita.adminweb.admin.eventos.Repository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.UUID;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import pe.gob.munisantanita.adminweb.Base.Utils.Constant;
import pe.gob.munisantanita.adminweb.Base.Utils.F;
import pe.gob.munisantanita.adminweb.Base.Utils.Helper;
import pe.gob.munisantanita.adminweb.admin.eventos.Model.Imagen;

@Repository
public class EventosRepository {

	public Imagen enviarImagen(ArrayList<MultipartFile> files) {
	    Imagen imagen = new Imagen();
		try {

		    for (MultipartFile file : files) {
				String archivo_real = file.getOriginalFilename();
				String archivo_ext = archivo_real.substring(archivo_real.lastIndexOf('.'));
				String archivo_nuevo = UUID.randomUUID().toString()+archivo_ext;
		
				file.transferTo(new File(Constant.DIR_UPLOAD_DATA_EVENTOS_GALERIA, archivo_nuevo));
				imagen.setEstado("OK");
			    imagen.setArchivo_url(archivo_nuevo);
			    return imagen;
		    }

			} catch (IllegalStateException | IOException e) {
				imagen.setEstado("ERR");
				imagen.setMensaje(e.getMessage());
				System.out.println("getMessage: "+e.getMessage());
				e.printStackTrace();
			}
			
			 return null;
	}

	public Object findEvento(long id) {
        try {
   		 HttpResponse httpResponse = F.get(Helper.apiEventos("evento/"+id));
   		 ObjectMapper objectMapper = new ObjectMapper();
   		 String r = EntityUtils.toString( httpResponse.getEntity());
   		Object lista = objectMapper.readValue(r, Object.class);
            return lista;
            
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			System.out.println("CategoriaRepository/all: "+e.getMessage());
			e.printStackTrace();
		}
        
		return null;
		 
	}

	public Imagen duplicarImagen(String archivo) {
		Imagen im = new Imagen();
	    try {
		Path source = Paths.get(Constant.DIR_UPLOAD_DATA_EVENTOS_GALERIA + archivo); //original file
		Path targetDir = Paths.get(Constant.DIR_UPLOAD_DATA_EVENTOS_GALERIA); 
		
		
		String archivo_ext = archivo.substring(archivo.lastIndexOf('.'));
		String archivo_nuevo = UUID.randomUUID().toString()+archivo_ext;
		
	    Path target = targetDir.resolve(archivo_nuevo);// create new path ending with `name` content
	    System.out.println("copying into " + target);

			Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
			im.setEstado("OK");
			im.setArchivo_url(archivo_nuevo);
			return im;
			
		} catch (IOException e) {
			im.setMensaje(e.getMessage());
			im.setEstado("ERR");
			e.printStackTrace();
		}
		
		return im;
	}

}
