# Generated by Django 3.2.7 on 2021-11-01 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_auto_20211022_1429"),
    ]

    operations = [
        migrations.AddField(
            model_name="layer",
            name="base_layer",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
