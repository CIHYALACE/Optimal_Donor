from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),  # Replace with your last migration
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='is_published',
            field=models.BooleanField(default=True),
        ),
    ]