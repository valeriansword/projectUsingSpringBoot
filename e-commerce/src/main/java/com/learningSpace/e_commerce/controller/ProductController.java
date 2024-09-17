package com.learningSpace.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.learningSpace.e_commerce.model.Product;
import com.learningSpace.e_commerce.service.ProductService;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/")
    public List<Product> getAllProducts(){
        return service.getAllProducts();
        
    }
    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id){
        return service.getProductById(id);
    }

    @PostMapping("/products/addProducts")
    public ResponseEntity<?> addProduct(@RequestPart Product product,@RequestPart MultipartFile imageFile)                                        
    {
        try{                              
        Product product1=service.addProduct(product,imageFile);
        return new ResponseEntity<>(product1,HttpStatus.CREATED);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/products/{id}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int id){
        Product product=service.getProductById(id);
        byte[] imageFile=product.getImageData();
        return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(imageFile);
    }
    @PutMapping("/products/updateProducts/{id}")
    public ResponseEntity<String> updateProductById(@PathVariable int id, @RequestPart Product product,@RequestPart MultipartFile imageFile){
            Product product1 =null;
            try{
                product1=service.updateProductById(id,product,imageFile);
            }catch(Exception e){
                return new ResponseEntity<>("Failed to update",HttpStatus.BAD_REQUEST );
            }
            if(product1 !=null){
                return new ResponseEntity<>("Updated",HttpStatus.OK);
            }else{
                return new ResponseEntity<>("failed to update",HttpStatus.BAD_REQUEST);
            }
    }
    @DeleteMapping("/products/deleteProducts/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        Product product=service.getProductById(id);
        if(product!=null)
        {
            service.deleteProduct(id);
            return new ResponseEntity<>("successfully Deleted",HttpStatus.OK);
        }else
        {
            return new ResponseEntity<>("failed deletion",HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword){
        System.out.println("Searching with keyword"+":" +keyword);
        List<Product> products=service.searchProducts(keyword);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }


    
}
