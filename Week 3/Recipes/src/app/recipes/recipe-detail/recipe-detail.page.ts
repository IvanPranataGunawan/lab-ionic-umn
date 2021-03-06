import { AlertController, ToastController } from '@ionic/angular';
import { RecipesService } from './../recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;
  constructor(private toastController: ToastController,private alertController: AlertController, private activatedRoute: ActivatedRoute, private recipesSvc: RecipesService, private router: Router){ }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('recipeId')){ return; }
        this.loadedRecipe = this.recipesSvc.getRecipe(paramMap.get('recipeId'));
      }
    );
  }

  async presentAlert(recipeId){
    const alert = await this.alertController.create({
      header: 'Delete Recipe',
      message: 'Are you sure you want to delete this recipe?',
      buttons: [
        {
          text: 'YES',
          handler: () => this.deleteRecipe(recipeId)
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  deleteRecipe(recipeId){
    this.recipesSvc.deleteRecipe(recipeId);
    this.router.navigate(['/recipes']);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Recipe has been deleted.',
      duration: 2000
    });
    toast.present();
  }
}
