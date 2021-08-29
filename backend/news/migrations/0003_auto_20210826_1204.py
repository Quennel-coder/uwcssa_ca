# Generated by Django 3.2.6 on 2021-08-26 16:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='article',
            options={'ordering': ['-id']},
        ),
        migrations.AlterModelOptions(
            name='topic',
            options={'ordering': ['-id']},
        ),
        migrations.RenameField(
            model_name='article',
            old_name='created_by',
            new_name='created_by_id',
        ),
        migrations.RenameField(
            model_name='article',
            old_name='topic',
            new_name='topic_id',
        ),
        migrations.RenameField(
            model_name='article',
            old_name='updated_by',
            new_name='updated_by_id',
        ),
        migrations.RenameField(
            model_name='topic',
            old_name='created_by',
            new_name='created_by_id',
        ),
    ]
