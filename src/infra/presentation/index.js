import { ControllerModuleCart , ControllerModuleProduct } from '../controllers/controller.module.js'

const cartController =  ControllerModuleCart.usage()
const productController = ControllerModuleProduct.usage()

productController.setMockProduct()
productController.loadProducts()