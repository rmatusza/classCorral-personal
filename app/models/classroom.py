from .db import db
from .classroom_user import classroom_user


class Classroom(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    class_image_url = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=False)
    daily_objective = db.Column(db.Text, nullable=True)
    meeting_link = db.Column(db.String(255), nullable=True)
    meeting_pw = db.Column(db.String(255), nullable=True)
    active = db.Column(db.Boolean, default=True)

    members = db.relationship(
        "Student",
        secondary=classroom_user,
        back_populates="classroom"
    )
    question = db.relationship(
        "Question",
        back_populates="classroom"
    )
    check_in = db.relationship(
        "CheckIn",
        back_populates="classroom"
    )
