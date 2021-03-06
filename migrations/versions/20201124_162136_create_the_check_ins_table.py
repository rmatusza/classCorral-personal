"""create the check_ins table

Revision ID: 9c5f3ceac079
Revises: be0ac635c8ae
Create Date: 2020-11-24 16:21:36.065447

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9c5f3ceac079'
down_revision = 'be0ac635c8ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('check_ins',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('student_id', sa.Integer(), nullable=True),
                    sa.Column('class_id', sa.Integer(), nullable=True),
                    sa.Column('created_on', sa.DateTime,
                              server_default=sa.func.now()),
                    sa.Column(
                        'updated_on',
                        sa.DateTime,
                        server_default=sa.func.now(),
                        server_onupdate=sa.func.now()
                    ),
                    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], ),
                    sa.ForeignKeyConstraint(['student_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('check_ins')
    # ### end Alembic commands ###
