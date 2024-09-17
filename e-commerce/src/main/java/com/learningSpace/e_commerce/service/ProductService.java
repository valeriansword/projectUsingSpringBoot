package com.learningSpace.e_commerce.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.learningSpace.e_commerce.model.Product;
import com.learningSpace.e_commerce.repo.ProductRepo;

@Service
public class ProductService {
    @Autowired
    private ProductRepo repo;

    public List<Product> getAllProducts(){
        return repo.findAll();
    }

    public Product getProductById(int id){
        return repo.findById(id).orElse(new Product());
    }

    public Product addProduct(Product product,MultipartFile imageFile) throws IOException
    {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return repo.save(product);
    }
    public Product updateProductById(int id,Product product,MultipartFile imageFile) throws IOException{
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return repo.save(product);
    }
    public void deleteProduct(int id){
        repo.deleteById(id);
    }
    public List<Product> searchProducts(String keyword){
        return repo.searchProducts(keyword);
    }
}
