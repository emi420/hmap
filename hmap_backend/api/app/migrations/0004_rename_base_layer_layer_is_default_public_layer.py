# Generated by Django 3.2.7 on 2021-11-05 17:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_layer_base_layer"),
    ]

    operations = [
        migrations.RenameField(
            model_name="layer",
            old_name="base_layer",
            new_name="is_default_public_layer",
        ),
    ]
